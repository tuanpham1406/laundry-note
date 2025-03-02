import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, readBody, getQuery } from "h3";

// Lấy thông tin từ biến môi trường
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export default defineEventHandler(async (event) => {
  try {
    const method = event.req.method;
    if (method === "GET") {
      // Lấy tất cả bản ghi từ table "laundry"
      const { data, error } = await supabase.from("laundry").select("*");
      if (error) throw error;
      return data;
    }
    if (method === "POST") {
      const body = await readBody(event);
      // Thêm bản ghi mới với số lượng mặc định là 0
      const { data, error } = await supabase
        .from("laundry")
        .insert([{ name: body.name, quantity: 0 }])
        .single();
      if (error) throw error;
      return data;
    }
    if (method === "PUT") {
      const body = await readBody(event);
      // Cập nhật số lượng cho bản ghi có id tương ứng
      const { data, error } = await supabase
        .from("laundry")
        .update({ quantity: body.quantity })
        .eq("id", body.id)
        .single();
      if (error) throw error;
      return data;
    }
    if (method === "DELETE") {
      const { id } = getQuery(event);
      // Xóa bản ghi có id tương ứng
      const { data, error } = await supabase
        .from("laundry")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return { success: true, data };
    }
  } catch (error) {
    console.error("API Error:", error);
    event.res.statusCode = 500;
    return { message: "Internal server error" };
  }
});
