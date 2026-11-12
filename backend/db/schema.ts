import { pgTable, serial, text, jsonb } from 'drizzle-orm/pg-core';

// 'tasks' नाम की एक टेबल बना रहे हैं
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),          // अपने आप बढ़ने वाला नंबर (1, 2, 3...)
  title: text('title').notNull(),         // SQL डेटा: काम का नाम
  extraInfo: jsonb('extra_info'),         // NoSQL डेटा: कोई भी एक्स्ट्रा जानकारी
});
