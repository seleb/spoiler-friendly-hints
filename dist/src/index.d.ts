export declare function convert(text: string, { preamble, title, preambleUrl, colorText, colorBg, colorAccent, indent, highlight, }?: {
    /** if `true`, output includes a short preamble */
    preamble?: boolean;
    /** if provided, title referenced in document head and preamble */
    title?: string;
    /** if provided, link wrapping title in preamble */
    preambleUrl?: string;
    colorText?: string;
    colorBg?: string;
    colorAccent?: string;
    /** regex used to split text */
    indent?: RegExp;
    /** regex used to determine highlighted lines */
    highlight?: RegExp;
}): string;
