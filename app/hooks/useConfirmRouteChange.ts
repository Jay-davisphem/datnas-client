import { usePathname, useRouter } from "next/navigation"; 
import { useEffect } from "react";
import { useConfirmationModal } from "./useConfirmationModal";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useConfirmRouteChange = (shouldBlock: boolean) => {
  const router = useRouter();
  const { requestConfirmation } = useConfirmationModal();
  const pathname = usePathname()

  useEffect(() => {
    if (!shouldBlock) return;

    // Intercept browser's beforeunload event
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      const confirmed = await requestConfirmation({
        title: "Leave this page?",
        message: "You have unsaved changes. Do you really want to leave this page?",
        confirmText: "Leave",
        cancelText: "Stay",
      });

      if (!confirmed) {
        event.preventDefault(); // Prevent navigation
        event.returnValue = ""; // Standard for modern browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldBlock, requestConfirmation]);

  // Intercept navigation with Next.js router
  const handleRouteChange = async (url: string) => {
    if (url === pathname) return; // Don't confirm if it's the same route

    const confirmed = await requestConfirmation({
      title: "Leave this page?",
      message: "You have unsaved changes. Do you really want to leave this page?",
      confirmText: "Leave",
      cancelText: "Stay",
    });

    if (!confirmed) {
      // Block the navigation attempt by not allowing the route change
      router.push(pathname); // Force stay on the current page
    }
  };

  useEffect(() => {
    if (shouldBlock) {
      // Handle programmatic navigation by using the router
      const originalPush = router.push;
      router.push = async (href: string, options?: NavigateOptions) => {
        await handleRouteChange(href);
        return originalPush.call(router, href, options);
      };
    }
  }, [shouldBlock, router]);

};
