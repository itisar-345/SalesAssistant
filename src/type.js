// Message object structure
// {
//   id: string,
//   role: 'user' | 'assistant',
//   content: string,
//   timestamp: Date,
//   language?: string
// }

// ConversationState object structure
// {
//   messages: Array<Message>,
//   isRecording: boolean,
//   isProcessing: boolean,
//   error: string | null,
//   currentLanguage: string
// }

// FAQ object structure
// {
//   question: string,
//   answer: string,
//   category: string,
//   translations?: {
//     [key: string]: {
//       question: string,
//       answer: string
//     }
//   }
// }

// KnowledgeBase object structure
// {
//   faqs: Array<FAQ>
// }

// SupportedLanguage object structure
// {
//   code: string,
//   name: string,
//   flag: string,
//   native?: string
// }
