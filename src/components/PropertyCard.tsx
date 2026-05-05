import { MapPin } from "lucide-react";
import { Link } from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type PaymentStatus = "Paid" | "Pending";

export interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  currency?: string;
  coordinates: { lat: number; lng: number };
  status: PaymentStatus;
}

export function PropertyCard({
  id,
  image,
  title,
  price,
  currency = "USD",
  coordinates,
  status,
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

  const isPaid = status === "Paid";

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl py-0 gap-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          width={800}
          height={576}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium shadow ${
            isPaid
              ? "bg-emerald-500 text-white hover:bg-emerald-500"
              : "bg-amber-500 text-white hover:bg-amber-500"
          }`}
        >
          {status}
        </Badge>
      </div>

      <CardContent className="p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-foreground">{title}</h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="font-mono text-xs">
            {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
          </span>
        </div>

        <div className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          {formattedPrice}
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Button asChild className="w-full rounded-xl">
          <Link to="/properties/$propertyId" params={{ propertyId: id }}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
