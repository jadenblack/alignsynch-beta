import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { PropDoc } from "@/lib/component-docs"

interface PropsTableProps {
  props: PropDoc[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono font-medium">
                {prop.name}
                {prop.required && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Required
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-mono text-sm">{prop.type}</TableCell>
              <TableCell className="font-mono text-sm">{prop.default ? `"${prop.default}"` : "-"}</TableCell>
              <TableCell>{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
