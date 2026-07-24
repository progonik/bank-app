"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha"
import { cn } from "@shared/lib/utils";
import { successToast, errorToast } from "@shared/lib/toast";
import { Button, Input } from "@shared/ui";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import { ROUTES } from "@shared/config/links";
import { persistAuthSession } from "@features/auth/model/session";
import { performMockLogin } from "@features/auth/model/mock-auth";
import { loginWithCredentials } from "@features/auth/api/login";

const useMockAuth = (): boolean =>
  process.env.NEXT_PUBLIC_MOCK_AUTH === "true" ||
  !process.env.NEXT_PUBLIC_API_BASE_URL;

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

export function LoginForm() {
  const router = useRouter();
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setHasError(false);
      setIsLoading(true);

      // MOCK FLOW
      if (useMockAuth()) {
        await new Promise((r) => setTimeout(r, 500));
        performMockLogin();
        successToast(t("common.success"));
        router.push(ROUTES.HOME);
        setIsLoading(false);
        return;
      }

      // CAPTCHA VALIDATION
      // if (!captchaToken) {
      //   errorToast(t("auth.captchaRequired") || "Complete reCAPTCHA");
      //   setIsLoading(false);
      //   return;
      // }

      try {
        const res = await loginWithCredentials(
          login,
          password
        );

        const tokenData =
          "status" in res && res.status === "OK" && res.data
            ? res.data
            : "access_token" in res && "refresh_token" in res
              ? res
              : null;

        if (tokenData) {
          persistAuthSession(tokenData);
          successToast(t("common.success"));
          router.push(ROUTES.HOME);
        } else if ("status" in res && res.status === "FORBIDDEN") {
          setHasError(true);
        }
      } catch {
        errorToast(t("common.error"));
      } finally {
        setLogin("");
        setPassword("");
        setIsLoading(false);

        // RESET CAPTCHA
        // setCaptchaToken(null);
        // recaptchaRef.current?.reset();
      }
    },
    [login, password, t, router]
  );

  return (
    <div className="max-w-[384px] w-full">
      <div className="rounded-[16px] p-6 border border-[#E2E8F0] w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="text-[#314158] text-[30px] leading-[36px] font-medium">
            {t("auth.login")}
          </h2>

          {hasError && (
            <div className="text-red-500 flex items-center gap-2 mt-2">
              <AlertCircleIcon className="w-4 h-4" />
              <p>{t("auth.wrongCredentials")}</p>
            </div>
          )}

          <div className="mt-6">
            <p className="form-label">{t("auth.username")}</p>
            <Input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              type="text"
              placeholder={t("auth.enterUsername")}
              className="form-input"
            />
          </div>

          <div className="mt-4">
            <p className="form-label">{t("auth.password")}</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder={t("auth.enterPassword")}
              className="form-input"
            />
          </div>

          {/* RECAPTCHA */}
          {/* <div className="mt-4 flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token: any) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div> */}

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full mt-6 form-button",
              (isLoading) && "cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                {t("auth.login")}
              </div>
            ) : (
              t("auth.login")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
