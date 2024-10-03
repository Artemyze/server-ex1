const Server = [
  "$resource",
  function ($resource) {
    return $resource(
      "/servers/:id",
      { id: "@_id" },
      {
        stop: {
          url: "/servers/:id/stop",
          method: "post",
          isArray: false,
        },
        start: {
          url: "/servers/:id/start",
          method: "post",
          isArray: false,
        },
        restart: {
          url: "/servers/:id/restart",
          method: "post",
          isArray: false,
        },
      },
    );
  },
];

export { Server };
