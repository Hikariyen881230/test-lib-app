import { MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  FormattedDate,
  FormattedDisplayName,
  FormattedNumber,
} from "react-intl";
import { messages } from "../App";

function Intl() {
  const [locale, setLocale] = useState("en");
  const formatOptions = messages[locale];
  return (
    <div>
      <TextField
        select
        label="Select Language"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        <MenuItem value="en">English (US)</MenuItem>
        <MenuItem value="fr">Français (FR)</MenuItem>
        <MenuItem value="ja">日本語 (JP)</MenuItem>
        <MenuItem value="zh-TW">繁體中文 (zh)</MenuItem>
      </TextField>

      <Typography variant="h6">Currency:</Typography>
      <FormattedNumber
        value={1000}
        style="currency"
        currency={formatOptions.currency}
      />

      <Typography variant="h6">Number Formatting:</Typography>
      <FormattedNumber value={1234567.89} />

      <Typography variant="h6">Date Formatting:</Typography>
      <FormattedDate
        value={new Date()}
        year="numeric"
        month="long"
        day="2-digit"
      />

      <Typography variant="h6">Unit of Measurement:</Typography>
      <FormattedNumber value={5} style="unit" unit={formatOptions.unit} />

      <Typography variant="h6">Name Format:</Typography>
      <Typography>
        <FormattedDisplayName value={"zh-tw"} type={"language"} />
        {formatOptions.nameFormat === "First Last" ? "John Doe" : "Doe John"}
      </Typography>
    </div>
  );
}

export default Intl;
