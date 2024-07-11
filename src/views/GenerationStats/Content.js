import React from "react";
import { Stack } from "@mui/material";

function Content() {
  return (
    <Stack direction="row" width="100%" flex="1" height="calc(100vh - 80px)">
      <iframe
        style={{ flex: 1 }}
        src="https://web3.isolarcloud.com.hk/#/login"
      />
    </Stack>
  );
}

export default Content;
