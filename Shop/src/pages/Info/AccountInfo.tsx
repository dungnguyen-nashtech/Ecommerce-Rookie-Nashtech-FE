import React, { useEffect } from "react";
import { QuerySearchOneFilter } from "../../services/queries/query-search.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";
import { useUserStore } from "../../stores/userStore.ts";

export function AccountInfo() {
  const userStore = useUserStore();
  const querySearchOneFilterUserInfo = QuerySearchOneFilter();
  useEffect(() => {
    querySearchOneFilterUserInfo.mutate({
        data: {
          field: "id",
          operator: "EQM",
          value: userStore?.user?.id ? userStore?.user?.id : "1"
        },
        url: "/user/search"
      }
    );
  }, []);


  if (querySearchOneFilterUserInfo.isPending) {
    return <CenteredLoader />;
  }

  const userData = querySearchOneFilterUserInfo?.data?.[0];
  if (!userData) {
    return <CenteredLoader />;
  }

  return (
    <>
      <h2>THÔNG TIN TÀI KHOẢN</h2>
      <br />
      <div>
        <h3>First Name: <b>{userData?.firstName}</b></h3><br />
        <h3>Last Name: <b>{userData?.lastName}</b></h3><br />
        <h3>Email: <b>{userData?.email}</b></h3><br />
        <h3>Is Account Actived: <b>{userData?.enabled ? "✔️" : "❌"}</b></h3>
      </div>
    </>
  );
}