import * as React from "react";
import { trpc } from "@/utils/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isPending } = trpc.fleet.greeting.useQuery({ name: "Liran" });
  return (
    <div className="p-2">
      <h3>{data?.text}</h3>
    </div>
  );
}
