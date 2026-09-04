import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
};
export default function CourseCard({
  id,
  title,
  description,
  price,
}: CourseCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="min-h-14 text-sm leading-6 text-zinc-600">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-semibold">₹{price}</p>

          <Link href={`/courses/${id}`}>
  <Button>View Course</Button>
</Link>
        </div>
      </CardContent>
    </Card>
  );
}