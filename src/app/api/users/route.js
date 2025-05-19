import users from "@/data/users.json";
export function GET(req) {
  return new Response(JSON.stringify(users), {
    status: 200,
  });
}
