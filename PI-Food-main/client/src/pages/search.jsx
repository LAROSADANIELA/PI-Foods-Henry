import { useEffect, useState } from "react";

export default function search() {
  const { recipeName, loading, error } = useSelector((state) => state.getName);

  const { title } = useQuery();

  useEffect(() => {
    dispatch(getRecipeName(title));
  }, []);
}
