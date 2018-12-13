interface AppRegExpressionsList {
    lyricValidator: RegExp;
    beatCount: RegExp;
}

export const AppRegExpressionsConfig: AppRegExpressionsList = {
    lyricValidator: /^[a-zA-Z\s]*$/,
    beatCount: /^[0-9]+\.[05]{1}$/,
};