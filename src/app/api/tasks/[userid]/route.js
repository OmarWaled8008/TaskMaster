import tasks from "@/data/task.json";

export async function GET(request, { params }) {
  const awaitedParams = await params;
  const { userid } = awaitedParams;
  const userTasks = tasks.filter((task) => {
    return task.userId === Number(userid);
  });
  return new Response(JSON.stringify( userTasks ));
}
