import React from "react";
import { cn } from "@/lib/utils";

const users = [
  { name: "Liam Nkosi", email: "liam@example.com", role: "Learner", status: "Active", joined: "Mar 2026" },
  { name: "Priya Sharma", email: "priya@example.com", role: "Learner", status: "Active", joined: "Apr 2026" },
  { name: "Marco Bianchi", email: "marco@example.com", role: "Reviewer", status: "Active", joined: "Feb 2026" },
  { name: "Aisha Khan", email: "aisha@example.com", role: "Learner", status: "Active", joined: "May 2026" },
  { name: "Elena Rossi", email: "elena@example.com", role: "Learner", status: "Suspended", joined: "Jan 2026" },
  { name: "Diego Santos", email: "diego@example.com", role: "Learner", status: "Active", joined: "Jun 2026" },
  { name: "Mei Lin", email: "mei@example.com", role: "Learner", status: "Active", joined: "Jul 2026" },
  { name: "Omar Farouk", email: "omar@example.com", role: "Learner", status: "Pending", joined: "Aug 2026" },
];

const rolePill = {
  Learner: "bg-muted text-muted-foreground",
  Reviewer: "bg-primary/15 text-primary",
  Admin: "bg-accent/15 text-accent",
};

const statusPill = {
  Active: "bg-success/15 text-success",
  Suspended: "bg-destructive/15 text-destructive",
  Pending: "bg-warning/15 text-warning",
};

export default function UsersTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Demo user table. Production user management, invitations, role assignment and suspension connect to the real auth backend — admins must never be able to grant themselves elevated roles from the client.
      </p>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium hidden sm:table-cell">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium hidden md:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-muted/20">
                <td className="px-5 py-3">
                  <div className="text-foreground">{u.name}</div>
                  <div className="text-[11px] text-muted-foreground">{u.email}</div>
                </td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className={cn("text-[10px] uppercase font-medium px-2 py-0.5 rounded", rolePill[u.role])}>{u.role}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={cn("text-[10px] uppercase font-medium px-2 py-0.5 rounded", statusPill[u.status])}>{u.status}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}