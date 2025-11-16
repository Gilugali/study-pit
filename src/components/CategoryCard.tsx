import * as React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import type { Subject } from "../types";

interface CategoryCardProps {
  title: Subject;
  icon: string;
}

export function CategoryCard({ title, icon }: CategoryCardProps) {
  return (
    <Link to={`/search?subject=${encodeURIComponent(title)}`}>
      <Card className="card-hover p-6 text-center cursor-pointer">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </Card>
    </Link>
  );
}
