import { knowledgeBase } from '../data/knowledgeBase';

export class NLPProcessor {
  async processInput(input, language = 'en') {
    const normalizedInput = input.toLowerCase();
    
    if (this.isGreeting(normalizedInput, language)) {
      return this.getGreetingResponse(language);
    }
    
    if (this.isFarewell(normalizedInput, language)) {
      return this.getFarewellResponse(language);
    }
    
    const faqMatch = this.matchWithFAQs(normalizedInput, language);
    if (faqMatch) {
      return faqMatch;
    }
    
    return this.getFallbackResponse(language);
  }
  
  isGreeting(input, language) {
    const greetings = {
      en: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
      es: ['hola', 'buenos días', 'buenas tardes', 'saludos'],
      fr: ['bonjour', 'salut', 'bonsoir', 'allô']
    };
    const langGreetings = greetings[language] || greetings.en;
    return langGreetings.some(greeting => input.includes(greeting));
  }
  
  getGreetingResponse(language) {
    const responses = {
      en: [
        "Hello! I'm your P2P lending assistant. How can I help you today?",
        "Welcome! I can help you with lending or borrowing. What would you like to know?"
      ],
      es: [
        "¡Hola! Soy tu asistente de préstamos P2P. ¿Cómo puedo ayudarte hoy?",
        "¡Bienvenido! Puedo ayudarte con préstamos. ¿Qué te gustaría saber?"
      ],
      fr: [
        "Bonjour! Je suis votre assistant de prêt P2P. Comment puis-je vous aider aujourd'hui?",
        "Bienvenue! Je peux vous aider avec les prêts. Que souhaitez-vous savoir?"
      ]
    };
    const languageResponses = responses[language] || responses.en;
    return languageResponses[Math.floor(Math.random() * languageResponses.length)];
  }
  
  isFarewell(input, language) {
    const farewells = {
      en: ['bye', 'goodbye', 'see you', 'thanks', 'thank you'],
      es: ['adiós', 'hasta luego', 'gracias', 'chao'],
      fr: ['au revoir', 'merci', 'à bientôt', 'salut']
    };
    const langFarewells = farewells[language] || farewells.en;
    return langFarewells.some(farewell => input.includes(farewell));
  }
  
  getFarewellResponse(language) {
    const responses = {
      en: [
        "Thank you for using our P2P lending platform. Have a great day!",
        "Thanks for your interest in P2P lending. Feel free to return if you have more questions."
      ],
      es: [
        "Gracias por usar nuestra plataforma de préstamos P2P. ¡Que tengas un excelente día!",
        "Gracias por tu interés en préstamos P2P. Vuelve si tienes más preguntas."
      ],
      fr: [
        "Merci d'utiliser notre plateforme de prêt P2P. Bonne journée!",
        "Merci de votre intérêt pour le prêt P2P. N'hésitez pas à revenir si vous avez d'autres questions."
      ]
    };
    const languageResponses = responses[language] || responses.en;
    return languageResponses[Math.floor(Math.random() * languageResponses.length)];
  }
  
  matchWithFAQs(input, language) {
    for (const faq of knowledgeBase.faqs) {
      const questionToMatch = (language !== 'en' && faq.translations && faq.translations[language])
        ? faq.translations[language].question
        : faq.question;
        
      const words = questionToMatch.toLowerCase().split(' ');
      const matchCount = words.filter(word => input.includes(word)).length;
      
      if (matchCount / words.length > 0.5) {
        return (language !== 'en' && faq.translations && faq.translations[language])
          ? faq.translations[language].answer
          : faq.answer;
      }
    }
    
    return null;
  }
  
  getFallbackResponse(language) {
    const responses = {
      en: [
        "I'm not sure I understand. Would you like to know about our lending rates or borrowing process?",
        "Could you rephrase that? I can help with loan applications, interest rates, or investment options."
      ],
      es: [
        "No estoy seguro de entender. ¿Te gustaría saber sobre nuestras tasas de préstamo o el proceso de solicitud?",
        "¿Podrías reformular eso? Puedo ayudarte con solicitudes de préstamos, tasas de interés u opciones de inversión."
      ],
      fr: [
        "Je ne suis pas sûr de comprendre. Voulez-vous en savoir plus sur nos taux de prêt ou le processus d'emprunt?",
        "Pourriez-vous reformuler? Je peux vous aider avec les demandes de prêt, les taux d'intérêt ou les options d'investissement."
      ]
    };
    const languageResponses = responses[language] || responses.en;
    return languageResponses[Math.floor(Math.random() * languageResponses.length)];
  }
}
