// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { useRRouteMatch, UU } from "../../cli-routes";
import {
  DefaultCmsSchemaPageProps,
  PlasmicCmsSchemaPage,
} from "../../plasmic/plasmic_kit_cms/PlasmicCmsSchemaPage";
import { useCmsDatabase } from "./cms-contexts";
export interface CmsSchemaPageProps extends DefaultCmsSchemaPageProps {}

function CmsSchemaPage_(
  props: CmsSchemaPageProps,
  ref: HTMLElementRefOf<"div">
) {
  const m = useRRouteMatch(UU.cmsSchemaRoot);
  const database = useCmsDatabase(m?.params.databaseId);
  if (!m || !database) {
    return null;
  }

  return (
    <Switch>
      <Route
        path={UU.cmsModelSchema.pattern}
        render={({ match }) => {
          if (
            database &&
            !database?.tables.find((t) => t.id === match.params.tableId)
          ) {
            return (
              <Redirect
                to={UU.cmsSchemaRoot.fill({
                  databaseId: match.params.databaseId,
                })}
              />
            );
          } else {
            return (
              <PlasmicCmsSchemaPage
                root={{ ref }}
                {...props}
                cmsModelDetails={{ key: match.params.tableId }}
              />
            );
          }
        }}
      />
      <Route
        path={UU.cmsSchemaRoot.pattern}
        render={({ match }) => {
          if (database && database.tables.length > 0) {
            return (
              <Redirect
                to={UU.cmsModelSchema.fill({
                  ...match.params,
                  tableId: database.tables[0].id,
                })}
              />
            );
          } else {
            return (
              <PlasmicCmsSchemaPage root={{ ref }} {...props} noModels={true} />
            );
          }
        }}
      />
    </Switch>
  );
}

const CmsSchemaPage = React.forwardRef(CmsSchemaPage_);
export default CmsSchemaPage;
