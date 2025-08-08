import {
  Container,
  Line,
  LineContainer,
  StrengthText,
  SuggestionsContainer,
  SuggestionItem,
} from "./strong-password-bar-styled";
import React from "react";

export type PasswordStrength = "" | "Too weak" | "Weak" | "Medium" | "Strong";

interface PasswordStrengthResult {
  contains: string[];
  length: number;
  id: number;
  value: string;
}

interface IStrongBar {
  strength: PasswordStrength;
  passwordResult?: PasswordStrengthResult;
}

const dict: Record<PasswordStrength, number> = {
  "": 0,
  "Too weak": 0,
  Weak: 1,
  Medium: 2,
  Strong: 3,
};

const getPasswordSuggestions = (
  passwordResult?: PasswordStrengthResult
): string[] => {
  if (!passwordResult || passwordResult.id >= 3) return [];

  const suggestions: string[] = [];
  const contains = passwordResult.contains || [];

  // Check what's missing
  if (!contains.includes("lowercase")) {
    suggestions.push("Add lowercase letters");
  }
  if (!contains.includes("uppercase")) {
    suggestions.push("Add uppercase letters");
  }
  if (!contains.includes("symbol")) {
    suggestions.push("Add special characters");
  }
  if (!contains.includes("number")) {
    suggestions.push("Add numbers");
  }
  if (passwordResult.length < 8) {
    suggestions.push("Use at least 8 characters");
  }

  return suggestions;
};

const StrongPasswordBar = ({ strength, passwordResult }: IStrongBar) => {
  const suggestions = getPasswordSuggestions(passwordResult);

  return (
    <Container>
      <LineContainer>
        <Line current={1} strength={dict[strength]} />
        <Line current={2} strength={dict[strength]} />
        <Line current={3} strength={dict[strength]} />
      </LineContainer>
      <StrengthText strength={dict[strength]}>
        {strength || "Too weak"}
      </StrengthText>
      {suggestions.length > 0 && (
        <SuggestionsContainer>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem key={index}>{suggestion}</SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </Container>
  );
};

export default React.memo(StrongPasswordBar);
