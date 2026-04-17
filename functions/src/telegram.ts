// Firebase Cloud Functions for Telegram Bot
// Deploy this to Firebase Functions

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const TELEGRAM_BOT_TOKEN = functions.config().telegram.bot_token;
const WEBSITE_URL = functions.config().app.url || 'https://apex-journal.com';

interface TelegramUpdate {
  message?: {
    chat: {
      id: number;
      first_name?: string;
      username?: string;
    };
    text?: string;
    from?: {
      id: number;
      first_name?: string;
      username?: string;
    };
  };
}

/**
 * Telegram Bot Webhook Handler
 * Set webhook: https://api.telegram.org/bot<TOKEN>/setWebhook?url=<YOUR_CLOUD_FUNCTION_URL>
 */
export const telegramWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const update: TelegramUpdate = req.body;
    const message = update.message;

    if (!message || !message.text) {
      res.status(200).send('OK');
      return;
    }

    const chatId = message.chat.id;
    const text = message.text.trim();
    const username = message.from?.username || message.chat.first_name || 'User';

    // Handle commands
    if (text === '/start') {
      await handleStartCommand(chatId, username);
    } else if (text === '/subscribe') {
      await handleSubscribeCommand(chatId, username);
    } else if (text === '/unsubscribe') {
      await handleUnsubscribeCommand(chatId);
    } else if (text === '/status') {
      await handleStatusCommand(chatId);
    } else {
      await sendMessage(chatId, 'Available commands:\n/subscribe - Subscribe to notifications\n/unsubscribe - Unsubscribe\n/status - Check subscription status');
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Handle /start command
 */
async function handleStartCommand(chatId: number, username: string) {
  const message = `
🏁 Welcome to APEX Magazine Bot, ${username}!

Get instant notifications about:
• New articles and stories
• Race updates and results
• Exclusive content

Use /subscribe to start receiving notifications.
  `.trim();

  await sendMessage(chatId, message);
}

/**
 * Handle /subscribe command
 */
async function handleSubscribeCommand(chatId: number, username: string) {
  try {
    // Check if already subscribed
    const subscribersRef = db.collection('subscribers');
    const existingQuery = await subscribersRef
      .where('telegramChatId', '==', chatId.toString())
      .limit(1)
      .get();

    if (!existingQuery.empty) {
      await sendMessage(chatId, '✅ You are already subscribed to APEX Magazine notifications!');
      return;
    }

    // Create new subscription
    await subscribersRef.add({
      telegramChatId: chatId.toString(),
      telegramUsername: username,
      subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      source: 'telegram',
      email: null // Can be linked later via website
    });

    const welcomeMessage = `
🏁 <b>Welcome to APEX Magazine!</b>

You're now subscribed to receive instant notifications!

You can:
• Use /unsubscribe to stop notifications
• Use /status to check your subscription
• Visit ${WEBSITE_URL} to link your email

Thank you for joining us! 🏎️
    `.trim();

    await sendMessage(chatId, welcomeMessage, 'HTML');
  } catch (error) {
    console.error('Subscribe error:', error);
    await sendMessage(chatId, '❌ Failed to subscribe. Please try again later.');
  }
}

/**
 * Handle /unsubscribe command
 */
async function handleUnsubscribeCommand(chatId: number) {
  try {
    const subscribersRef = db.collection('subscribers');
    const query = await subscribersRef
      .where('telegramChatId', '==', chatId.toString())
      .limit(1)
      .get();

    if (query.empty) {
      await sendMessage(chatId, '❌ You are not subscribed.');
      return;
    }

    // Update status to unsubscribed
    await query.docs[0].ref.update({
      status: 'unsubscribed',
      unsubscribedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    await sendMessage(chatId, '✅ You have been unsubscribed. Use /subscribe to subscribe again.');
  } catch (error) {
    console.error('Unsubscribe error:', error);
    await sendMessage(chatId, '❌ Failed to unsubscribe. Please try again later.');
  }
}

/**
 * Handle /status command
 */
async function handleStatusCommand(chatId: number) {
  try {
    const subscribersRef = db.collection('subscribers');
    const query = await subscribersRef
      .where('telegramChatId', '==', chatId.toString())
      .limit(1)
      .get();

    if (query.empty) {
      await sendMessage(chatId, '❌ You are not subscribed. Use /subscribe to start receiving notifications.');
      return;
    }

    const subscriber = query.docs[0].data();
    const status = subscriber.status === 'active' ? '✅ Active' : '❌ Inactive';
    const subscribedDate = subscriber.subscribedAt?.toDate().toLocaleDateString() || 'Unknown';

    const message = `
📊 <b>Subscription Status</b>

Status: ${status}
Subscribed: ${subscribedDate}
Email: ${subscriber.email || 'Not linked'}

Visit ${WEBSITE_URL} to manage your subscription.
    `.trim();

    await sendMessage(chatId, message, 'HTML');
  } catch (error) {
    console.error('Status error:', error);
    await sendMessage(chatId, '❌ Failed to get status. Please try again later.');
  }
}

/**
 * Send message via Telegram API
 */
async function sendMessage(chatId: number, text: string, parseMode: 'HTML' | 'Markdown' = 'HTML') {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
    }),
  });
}

/**
 * Notify all subscribers about new article
 * Call this function when a new article is published
 */
export const notifyNewArticle = functions.firestore
  .document('articles/{articleId}')
  .onCreate(async (snap, context) => {
    const article = snap.data();

    // Only notify if article is published
    if (!article.published) {
      return;
    }

    try {
      // Get all active subscribers
      const subscribersRef = db.collection('subscribers');
      const activeSubscribers = await subscribersRef
        .where('status', '==', 'active')
        .where('telegramChatId', '!=', null)
        .get();

      const articleUrl = `${WEBSITE_URL}/article/${snap.id}`;

      const message = `
🏁 <b>New Article on APEX Magazine!</b>

<b>${article.title}</b>

${article.excerpt || ''}

<a href="${articleUrl}">Read More →</a>
      `.trim();

      // Send to all subscribers
      const promises = activeSubscribers.docs.map(async (doc) => {
        const subscriber = doc.data();
        const chatId = subscriber.telegramChatId;

        try {
          await sendMessage(parseInt(chatId), message, 'HTML');
        } catch (error) {
          console.error(`Failed to send to ${chatId}:`, error);
        }
      });

      await Promise.all(promises);

      console.log(`Notified ${activeSubscribers.size} subscribers about article: ${article.title}`);
    } catch (error) {
      console.error('Failed to notify subscribers:', error);
    }
  });
