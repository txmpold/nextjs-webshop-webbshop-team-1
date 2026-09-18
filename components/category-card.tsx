import { Card, CardHeader, CardTitle } from "@/components/ui/card";
export interface CategoryCardProps {
  category: string;
  image: string | null;
}

export function CategoryCard({ category, image }: CategoryCardProps) {
  return (
    <Card className="relative h-full w-full min-w-0 pt-0 bg-[#2f2f2f] hover:bg-[#4f4f4f] transition-all duration-300">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      {image && (
        <img
          src={image}
          alt={category}
          className="relative z-20 aspect-video w-full object-cover"
        />
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-[#ede7da]">{category}</CardTitle>
      </CardHeader>
    </Card>
  );
}
