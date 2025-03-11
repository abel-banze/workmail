import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// English translations
const enResources = {
  translation: {
    // Common
    send: "Send",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    general: "General",
    appearance: "Appearance",
    appearanceDescription: "Customize the look and feel of your application",
    notifications: "Notifications",
    notificationsDescription: "Manage your notification preferences",
    security: "Security",
    securityDescription: "Manage your account security settings",
    privacy: "Privacy",
    advanced: "Advanced",
    advancedSettings: "Advanced Settings",
    advancedSettingsDescription: "Configure advanced application settings",
    emailNotifications: "Email Notifications",
    emailNotificationsDescription: "Receive notifications about new emails",
    soundEffects: "Sound Effects",
    soundEffectsDescription: "Play sounds when you receive new emails",
    desktopNotifications: "Desktop Notifications",
    desktopNotificationsDescription: "Show notifications on your desktop",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorAuthDescription: "Add an extra layer of security to your account",
    deleteAccount: "Delete Account",
    deleteAccountWarning: "This action cannot be undone. Your account will be permanently deleted.",
    autoSaveDrafts: "Auto-Save Drafts",
    autoSaveDraftsDescription: "Automatically save drafts as you write",
    saveSettings: "Save Settings",
    settings: "Settings",
    settingsSaved: "Settings saved successfully",
    settingsError: "Failed to save settings",
    saving: "Saving...",
    enterEmailOrName: "Enter email or name",
    member: "member",
    members: "members",
    add: "Add",

    // Editor
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
    strikethrough: "Strikethrough",
    bulletList: "Bullet List",
    numberedList: "Numbered List",
    heading: "Heading",
    fontSize: "Font Size",
    fontColor: "Font Color",
    highlight: "Highlight",
    link: "Link",
    image: "Image",
    alignLeft: "Align Left",
    alignCenter: "Align Center",
    alignRight: "Align Right",

    // Compose
    compose: "Compose",
    to: "To",
    cc: "Cc",
    bcc: "Bcc",
    subject: "Subject",
    message: "Message",
    attachments: "Attachments",
    addAttachment: "Add Attachment",
    selectRecipients: "Select Recipients",
    selectGroups: "Select Groups",

    // Settings
    language: "Language",
    theme: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    systemTheme: "System",
    privacy: "Privacy",

    // Placeholders
    writeSomething: "Write something...",
    enterSubject: "Enter subject...",
    searchRecipients: "Search recipients...",

    // Messages
    messageSent: "Message sent successfully",
    messageError: "Error sending message",
    draftSaved: "Draft saved",

    // Groups
    personal: "Personal",
    work: "Work",
    family: "Family",
    friends: "Friends",
  },
}

// Portuguese translations
const ptResources = {
  translation: {
    // Common
    send: "Enviar",
    cancel: "Cancelar",
    save: "Salvar",
    delete: "Excluir",
    edit: "Editar",
    close: "Fechar",
    general: "Geral",
    appearance: "Aparência",
    appearanceDescription: "Personalize a aparência da sua aplicação",
    notifications: "Notificações",
    notificationsDescription: "Gerencie suas preferências de notificação",
    security: "Segurança",
    securityDescription: "Gerencie as configurações de segurança da sua conta",
    privacy: "Privacidade",
    advanced: "Avançado",
    advancedSettings: "Configurações Avançadas",
    advancedSettingsDescription: "Configure ajustes avançados da aplicação",
    emailNotifications: "Notificações por Email",
    emailNotificationsDescription: "Receba notificações sobre novos emails",
    soundEffects: "Efeitos Sonoros",
    soundEffectsDescription: "Reproduzir sons quando receber novos emails",
    desktopNotifications: "Notificações de Desktop",
    desktopNotificationsDescription: "Mostrar notificações no seu desktop",
    twoFactorAuth: "Autenticação de Dois Fatores",
    twoFactorAuthDescription: "Adicione uma camada extra de segurança à sua conta",
    deleteAccount: "Excluir Conta",
    deleteAccountWarning: "Esta ação não pode ser desfeita. Sua conta será permanentemente excluída.",
    autoSaveDrafts: "Salvar Rascunhos Automaticamente",
    autoSaveDraftsDescription: "Salvar rascunhos automaticamente enquanto você escreve",
    saveSettings: "Salvar Configurações",
    settings: "Configurações",
    settingsSaved: "Configurações salvas com sucesso",
    settingsError: "Falha ao salvar as configurações",
    saving: "Salvando...",
    enterEmailOrName: "Digite email ou nome",
    member: "membro",
    members: "membros",
    add: "Adicionar",

    // Editor
    bold: "Negrito",
    italic: "Itálico",
    underline: "Sublinhado",
    strikethrough: "Tachado",
    bulletList: "Lista com Marcadores",
    numberedList: "Lista Numerada",
    heading: "Título",
    fontSize: "Tamanho da Fonte",
    fontColor: "Cor da Fonte",
    highlight: "Destaque",
    link: "Link",
    image: "Imagem",
    alignLeft: "Alinhar à Esquerda",
    alignCenter: "Centralizar",
    alignRight: "Alinhar à Direita",

    // Compose
    compose: "Compor",
    to: "Para",
    cc: "Cc",
    bcc: "Cco",
    subject: "Assunto",
    message: "Mensagem",
    attachments: "Anexos",
    addAttachment: "Adicionar Anexo",
    selectRecipients: "Selecionar Destinatários",
    selectGroups: "Selecionar Grupos",

    // Settings
    language: "Idioma",
    theme: "Tema",
    lightTheme: "Claro",
    darkTheme: "Escuro",
    systemTheme: "Sistema",
    privacy: "Privacidade",

    // Placeholders
    writeSomething: "Escreva algo...",
    enterSubject: "Digite o assunto...",
    searchRecipients: "Buscar destinatários...",

    // Messages
    messageSent: "Mensagem enviada com sucesso",
    messageError: "Erro ao enviar mensagem",
    draftSaved: "Rascunho salvo",

    // Groups
    personal: "Pessoal",
    work: "Trabalho",
    family: "Família",
    friends: "Amigos",
  },
}

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: enResources,
    pt: ptResources,
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

