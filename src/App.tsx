//packages block
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
//components block
import { AuthContextProvider } from "./context";
import { CloseButton, SnackbarUtilsConfiguration } from "./components/common/Alert";
//other
import client from "./apollo";
import customTheme from "./theme";
import Routes from "./routes";

function App() {
  return (
    <SnackbarProvider
      maxSnack={5} autoHideDuration={5000} action={key => <CloseButton id={key} />}
      preventDuplicate={true} anchorOrigin={{ vertical: "top", horizontal: "right" }}
      classes={{ containerRoot: 'snackbarProvider' }}
    >
      <SnackbarUtilsConfiguration />
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </AuthContextProvider>
      </ApolloProvider>

    </SnackbarProvider>
  );
}

export default App;
