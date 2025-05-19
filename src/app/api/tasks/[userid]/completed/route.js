import tasks from "@/data/task.json";

export async function GET(request, { params }) {
  const awaitedParams = await params;
  const { userid } = awaitedParams;
  const userTasks = tasks.filter((task) => {
    return task.userId === Number(userid) && task.status === "completed";
  });
  return new Response(JSON.stringify(userTasks));
}

// export async function PATCH(request, { params }) {
//   const awaitedParams = await params;
//   const { userid } = awaitedParams;
//   const body = await request.json();
//   const { id } = body;

// }