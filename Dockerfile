FROM denoland/deno:2.5.1
WORKDIR /app
COPY deno.json ./
COPY src ./src
RUN deno cache src/main.ts
USER root
RUN mkdir -p /data && chown deno:deno /data
USER deno
ENV DENO_KV_PATH=/data/google-apps-script-mcp.sqlite3
VOLUME ["/data"]
EXPOSE 8000
CMD ["run", "--allow-env", "--allow-net", "--allow-read=/data", "--allow-write=/data", "--unstable-kv", "src/main.ts"]
