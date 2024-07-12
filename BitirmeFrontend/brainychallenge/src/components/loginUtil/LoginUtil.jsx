import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { GoogleIcon } from "./ProviderIcons";

const providers = [{ name: "Google", icon: <GoogleIcon boxSize="5" /> }];

export const LoginUtil = () => (
   <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon }) => (
         <Button key={name} width="full">
            <VisuallyHidden>Kayıt ol {name}</VisuallyHidden>
            {icon}
         </Button>
      ))}
   </ButtonGroup>
);
