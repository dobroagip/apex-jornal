// Telegram Bot API integration for newsletter notifications

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_web_page_preview?: boolean;
}

/**
 * Send a message via Telegram Bot API
 */
export async function sendTelegramMessage(message: TelegramMessage): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('Telegram bot token is not configured');
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

/**
 * Send notification about new article to subscriber
 */
export async function notifyNewArticle(
  chatId: string | number,
  article: {
    title: string;
    excerpt: string;
    url: string;
  }
): Promise<boolean> {
  const message = `
🏁 <b>New Article on APEX Magazine!</b>

<b>${article.title}</b>

${article.excerpt}

<a href="${article.url}">Read More →</a>
  `.trim();

  return sendTelegramMessage({
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: false,
  });
}

/**
 * Send welcome message to new subscriber
 */
export async function sendWelcomeMessage(chatId: string | number): Promise<boolean> {
  const message = `
🏁 <b>Welcome to APEX Magazine!</b>

You're now subscribed to receive instant notifications about:
• New articles and stories
• Race updates and results
• Exclusive content

You can unsubscribe anytime by sending /unsubscribe

Thank you for joining us! 🏎️
  `.trim();

  return sendTelegramMessage({
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
  });
}

/**
 * Get bot info (for testing connection)
 */
export async function getBotInfo() {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram bot token is not configured');
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get bot info:', error);
    throw error;
  }
}
