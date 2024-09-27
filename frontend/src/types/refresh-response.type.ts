export type RefreshResponseType = {
    error: boolean,
    // Помечаем знаком вопроса поля которые могут не прийти с бекенда
    accessToken?: string,
    refreshToken?: string,
    message: string | null
}