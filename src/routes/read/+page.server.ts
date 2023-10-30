import type { Book } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/");
  }

  const { data } = await supabase
    .from("books")
    .select()
    .eq("owner", session.user.id)
    .eq("status", "read")
    .order("finished", { ascending: false });

  const books = data as Book[];
  return { books };
};
