import { useRouter } from "next/router";

export const useWhereIs = () => {
  const router = useRouter();
  const { pathname, asPath } = router;

  const isHomePage = () => {
    return pathname === "/" || asPath === "/";
  };

  const isExactPath = (path: string) => {
    return pathname === path || asPath === path;
  };

  const isDynamicRoute = (route: string) => {
    return pathname === route;
  };

  const pathIncludes = (segment: string) => {
    return pathname.includes(segment) || asPath.includes(segment);
  };

  const pathStartsWith = (segment: string) => {
    return pathname.startsWith(segment) || asPath.startsWith(segment);
  };

  return {
    isHomePage,
    isExactPath,
    isDynamicRoute,
    pathIncludes,
    pathStartsWith,
    currentPath: pathname,
    currentAsPath: asPath,
  };
};
