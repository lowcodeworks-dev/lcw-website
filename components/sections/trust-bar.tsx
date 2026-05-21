const items = [
  'Mendix Expert Certified · Since 2018',
  'Ex-Siemens · Mendix NL alumni',
  'Remote first · Travel when it matters',
  'Digital transformation · Low-code & AI',
  'Based in APAC · Available worldwide',
]

export function TrustBar() {
  return (
    <div className="border-y border-border bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 py-3.5">
        <ul className="flex flex-wrap items-center justify-center divide-x divide-border">
          {items.map((item) => (
            <li
              key={item}
              className="px-5 py-0.5 text-xs font-medium text-muted-foreground whitespace-nowrap first:pl-0 last:pr-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
