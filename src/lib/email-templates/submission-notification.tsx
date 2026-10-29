import * as React from "react";
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";
import { NOTIFY_EMAIL, kindLabel, notificationSubject } from "../submission-email";

interface Props {
  kind?: string;
  name?: string | null;
  email?: string;
  phone?: string | null;
  message?: string | null;
  locale?: string;
  receivedAt?: string;
}

const Row = ({ label, value }: { label: string; value?: string | null | undefined }) =>
  value ? (
    <Text style={row}>
      <strong>{label}:</strong> {value}
    </Text>
  ) : null;

const SubmissionNotification = ({ kind, name, email, phone, message, locale, receivedAt }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New ${kindLabel(kind ?? "")} from ${name || email || "the website"}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New {kindLabel(kind ?? "")}</Heading>
        <Text style={muted}>Sent from the People for Ukraine website form. Reply to this email to answer the visitor.</Text>
        <Section>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          <Row label="Language" value={locale} />
          <Row label="Received" value={receivedAt} />
        </Section>
        {message ? (
          <>
            <Hr style={hr} />
            <Text style={{ ...row, whiteSpace: "pre-line" }}>{message}</Text>
          </>
        ) : null}
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: SubmissionNotification,
  subject: (d: Record<string, any>) => notificationSubject(String(d["kind"] ?? "")),
  displayName: "Form submission notification",
  to: NOTIFY_EMAIL,
  previewData: {
    kind: "volunteer",
    name: "Maria Rossi",
    email: "maria@example.com",
    phone: "+39 333 000 0000",
    message: "Vorrei aiutare con lo smistamento degli aiuti il sabato.",
    locale: "it",
    receivedAt: "29/10/2026, 10:00:00",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { padding: "24px 28px", maxWidth: "560px" };
const h1 = { color: "#1d3f8f", fontSize: "22px", margin: "0 0 8px" };
const muted = { color: "#666666", fontSize: "13px", margin: "0 0 16px" };
const row = { color: "#222222", fontSize: "15px", margin: "4px 0", lineHeight: "1.5" };
const hr = { borderColor: "#e5e5e5", margin: "16px 0" };
