import React, { useState, useCallback } from "react";

import { Autocomplete, TextField } from "@shopify/polaris";

interface option {
  value: string;
  label: string;
}

interface Props {
  initialOptions: option[];
  fieldType: string;
  setSelectedOption: (option: string) => void;
  selectedOption: string | null;
}

export default function SearchField({
  initialOptions,
  fieldType,
  setSelectedOption,
  selectedOption,
}: Props) {
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<option[]>(initialOptions);
  const [focused, setFocused] = useState(false);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(initialOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = initialOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [initialOptions]
  );

  const updateSelection = (selected: string[]) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });

    setSelectedOption(selected[0]);
    setSelectedLabel(selectedValue[0]);
    setInputValue("");
  };

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={fieldType}
      labelHidden
      value={inputValue}
      placeholder={`Search ${fieldType}s`}
      focused={focused}
    />
  );

  if (selectedOption) {
    return (
      <TextField
        label={fieldType}
        labelHidden
        value={selectedLabel}
        onChange={(value) => {
          updateText(value.replace(selectedLabel, ""));
          setFocused(true);
          setSelectedOption(null);
        }}
        clearButton
        onClearButtonClick={() => {
          setFocused(false);
          setSelectedOption(null);
        }}
      />
    );
  }

  return (
    <Autocomplete
      options={options}
      selected={[]}
      onSelect={updateSelection}
      textField={textField}
      emptyState={`No ${fieldType}s Found`}
    />
  );
}
