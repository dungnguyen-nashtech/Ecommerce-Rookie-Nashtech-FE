import {Authenticated, Refine} from "@refinedev/core";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {
    ErrorComponent,
    RefineSnackbarProvider,
    ThemedLayoutV2,
    ThemedTitleV2,
    useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {authProvider} from "./authProvider";
import {AppIcon} from "./components/app-icon";
import {Header} from "./components";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {CategoryCreate, CategoryEdit, CategoryList, CategoryShow,} from "./pages/categories";
import {ForgotPassword} from "./pages/forgotPassword";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {listResourceApi} from "./listResourceApi";
import {ProductItemList} from "./pages/product-items/list";
import {ProductItemEdit} from "./pages/product-items/edit";
import React from "react";
import {ProductList} from "./pages/products/list";
import {ProductEdit} from "./pages/products/edit";
import {ProductShow} from "./pages/products/show";
import {CommonProvider} from "./providers/common-provider";
import {getProductItemsByProductId} from "./providers/getProductItemsByProductId-provider";
import {ProductCreate} from "./pages/products/create";
import {
    ParentCategoryCreate,
    ParentCategoryEdit,
    ParentCategoryList,
    ParentCategoryShow
} from "./pages/parent-categories";

function App() {
    const dataProvider = {
        default: CommonProvider,
        "getProductItemsByProductId": getProductItemsByProductId,
        // etc
    };

    const options = {
        syncWithLocation: false,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: import.meta.env.VITE_PROJECT_ID,
    };

    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline/>
                    <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
                    <RefineSnackbarProvider>
                        <Refine
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider}
                            authProvider={authProvider}
                            routerProvider={routerBindings}
                            resources={listResourceApi}
                            options={options}>
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated
                                            key="authenticated-inner" fallback={<CatchAllNavigate to="/login"/>}
                                            v3LegacyAuthProviderCompatible>
                                            <ThemedLayoutV2 Header={() => <Header sticky/>} Title={({collapsed}) => (
                                                <ThemedTitleV2 collapsed={collapsed} text="Admin Dashboard"
                                                               icon={
                                                                   <AppIcon/>}/>)}><Outlet/></ThemedLayoutV2></Authenticated>}>
                                    <Route // index route page
                                        index
                                        element={<NavigateToResource resource="productItem"/>}
                                    />
                                    <Route path="/category">
                                        <Route index element={<CategoryList/>}/>
                                        <Route path="create" element={<CategoryCreate/>}/>
                                        <Route path="edit/:id" element={<CategoryEdit/>}/>
                                        <Route path="show/:id" element={<CategoryShow/>}/>
                                    </Route>
                                    <Route path="/category/parent">
                                        <Route index element={<ParentCategoryList/>}/>
                                        <Route path="create" element={<ParentCategoryCreate/>}/>
                                        <Route path="edit/:id" element={<ParentCategoryEdit/>}/>
                                        <Route path="show/:id" element={<ParentCategoryShow/>}/>
                                    </Route>
                                    <Route path="/productItem">
                                        <Route index element={<ProductItemList/>}/>
                                        {/*<Route path="create" element={<ProductItemCreate/>}/>*/}
                                        <Route path=":id/edit" element={<ProductItemEdit/>}/>
                                    </Route>
                                    <Route path="/product">
                                        <Route index element={<ProductList/>}/>
                                        <Route path="create" element={<ProductCreate/>}/>
                                        <Route path=":id/edit" element={<ProductEdit/>}/>
                                        <Route path="show/:id" element={<ProductShow/>}/>
                                    </Route>
                                    <Route path="*" element={<ErrorComponent/>}/>
                                </Route>
                                <Route
                                    element={
                                        <Authenticated
                                            key="authenticated-outer"
                                            fallback={<Outlet/>}
                                            v3LegacyAuthProviderCompatible>
                                            <NavigateToResource/>
                                        </Authenticated>
                                    }
                                >
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route
                                        path="/forgot-password"
                                        element={<ForgotPassword/>}
                                    />
                                </Route>
                            </Routes>

                            <RefineKbar/>
                            <UnsavedChangesNotifier/>
                            <DocumentTitleHandler/>
                        </Refine>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
