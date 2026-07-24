"use client";

import { useI18nStore } from "@shared/lib/i18n";
import { createTranslator } from "@shared/lib/i18n";
import { SIDEBAR_MENU_KEYS } from "@entities/navigation";
import { Button, Form, Input } from "@/src/shared/ui";
import { useCallback } from "react";
import { updateToken } from "@/src/shared/api/token";
import { errorToast, successToast } from "@/src/shared";
import { useForm } from "react-hook-form";

type FormValues = {
    token: string;
};

export function TokenPage() {
    const language = useI18nStore((s) => s.language);
    const t = createTranslator(language);

    const form = useForm<FormValues>({
        defaultValues: { token: "" },
    });

    const onSubmit = useCallback(
        async (data: FormValues) => {
            if (!data.token.trim()) return;

            try {
                await updateToken(data.token);
                successToast(t("common.success"));
                form.reset();
            } catch {
                errorToast(t("common.error"));
            }
        },
        [t, form]
    );

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold text-[#1E293B]">
                {t(SIDEBAR_MENU_KEYS.TOKEN)}
            </h1>

            <div className="max-w-[350px] mt-4 flex gap-4">
                {/* <Form control={form.control} onSubmit={form.handleSubmit(onSubmit)}>
                    <Input {...form.register("token")} placeholder="Enter token" />
                    <Button type="submit">
                        {t("entrepreneurs.save")}
                    </Button>
                </Form> */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="max-w-[350px] mt-4 flex gap-4"
                    >
                        <Input {...form.register("token")} placeholder="Enter token" />

                        <Button type="submit">
                            {t("entrepreneurs.save")}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}