interface Rule {
  category: string;
  keywords: string[];
  response: string;
  nextStep: Rule[] | null;
}

export const matchRule = (input: string, rules: Rule[]): Rule | null => {
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => input.toLowerCase().includes(keyword))) {
      return rule;
    }
  }
  return null;
};
