import { promises as fs } from "fs";
import { join } from "path";
import { defineEventHandler, readBody, getQuery } from "h3";

const filePath = join(process.cwd(), "data", "laundry.json");

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  if (method === "GET") {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }
  if (method === "POST") {
    const body = await readBody(event);
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const newItem = { id: Date.now(), name: body.name, quantity: 0 };
    data.push(newItem);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return newItem;
  }
  if (method === "PUT") {
    const body = await readBody(event);
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const index = data.findIndex((item) => item.id === body.id);
    if (index !== -1) {
      data[index].quantity = body.quantity;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return data[index];
    }
    return { error: "Không tìm thấy bản ghi" };
  }
  if (method === "DELETE") {
    const { id } = getQuery(event);
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const newData = data.filter((item) => item.id !== Number(id));
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    return { success: true };
  }
});
