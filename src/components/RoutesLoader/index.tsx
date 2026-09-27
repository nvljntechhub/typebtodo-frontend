import { type ComponentType, Suspense } from "react";
import SuspenseLoader from "../SuspenseLoader";

const RoutesLoader = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default RoutesLoader;
