import {AuthPage, ThemedTitleV2} from "@refinedev/mui";
import {AppIcon} from "../../components/app-icon";

export const Login = () => {
    return (
        <AuthPage
            type="login"
            title={
                <ThemedTitleV2
                    collapsed={false}
                    text="Admin Dashboard"
                    icon={<AppIcon/>}
                />
            }
            formProps={{
                defaultValues: {email: "test1@gmail.com", password: "123"},
            }}
        />
    );
};
