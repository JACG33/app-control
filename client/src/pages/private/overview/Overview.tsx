import { useEffect, useState } from "react";
import Toast from "../../../components/notifications/Toast";
import * as Icons from "../../../components/svg";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { StateError } from "../../../types/Response.types";
import overviewcss from "./overview.module.css";

type OverviewState = {
  users: number | string;
  roles: number | string;
  conversations: number | string;
  messages: number | string;
  uploads: number | string;
};

const Overview = () => {
  const [overviewData, setOverviewData] = useState<OverviewState[]>([]);
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });
  const { getHttp } = useAuthContext();

  const getInfo = async () => {
    try {
      const req = await getHttp({ endpoint: `${API_URL}/irrelevants` });

      if (!req.ok) throw req;
      const json = await req.json();
      setOverviewData(json.body);
    } catch (error) {
      if (error instanceof Response) {
        const messages = await error.json();
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={overviewcss.overview}>
      {/* Messages */}
      {errors.typeMessage == "error" && (
        <Toast messageType="error" data={errors.messages} />
      )}
      {errors.typeMessage == "success" && (
        <Toast messageType="success" data={errors.messages} />
      )}
      {/*  */}
      {/* Overview */}
      <div className={overviewcss.bento__info}>
        {overviewData.length > 0 && (
          <>
            <div
              className={`${overviewcss.bento__item} ${overviewcss.bento__users}`}
              title="Usuarios"
            >
              <span>
                {overviewData[0].users
                  ? overviewData[0].users
                  : "Sin Registros"}
              </span>
              <Icons.User />
            </div>
            <div
              className={`${overviewcss.bento__item} ${overviewcss.bento__roles}`}
              title="Roles"
            >
              <span>
                {overviewData[1].roles
                  ? overviewData[1].roles
                  : "Sin Registros"}
              </span>
              <Icons.Badges />
            </div>
            <div
              className={`${overviewcss.bento__item} ${overviewcss.bento__conversations}`}
              title="Conversaciones"
            >
              <span>
                {overviewData[2].conversations
                  ? overviewData[2].conversations
                  : "Sin Registros"}
              </span>
              <Icons.Chat />
            </div>
            <div
              className={`${overviewcss.bento__item} ${overviewcss.bento__messages}`}
              title="Mensajes"
            >
              <span>
                {overviewData[3].messages
                  ? overviewData[3].messages
                  : "Sin Registros"}
              </span>
              <Icons.Message />
            </div>
            <div
              className={`${overviewcss.bento__item} ${overviewcss.bento__uploads}`}
              title="Uploads"
            >
              <span>
                {overviewData[4].uploads
                  ? overviewData[4].uploads
                  : "Sin Registros"}
              </span>
              <Icons.CloudUpload />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
