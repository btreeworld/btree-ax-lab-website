/** JSON-LD 삽입 — 마스터 문서 18.4 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
