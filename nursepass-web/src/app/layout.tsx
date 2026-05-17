import type { Metadata } from 'next';
import { Syne, Nunito } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NursePass Kenya — Pass Your NCK Exam, First Try',
  description: "Kenya's Smartest NCK Revision Platform. DigiProctor-identical mock exams, 5,000+ answered MCQs, and an AI study plan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${nunito.variable}`}>
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
