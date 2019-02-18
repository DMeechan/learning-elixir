defmodule Lispex.Env do
  def new_env(outer \\ nil) do
    env = %{
      :+ => &(List.first(&1) + List.last(&1)),
      :- => &(List.first(&1) - List.last(&1)),
      :> => &(List.first(&1) > List.last(&1)),
      :log => &:math.log(List.first(&1)),
      :sin => &:math.sin(List.first(&1)),
      :sqrt => &:math.sqrt(List.first(&1)),
      :car => &List.first(List.last(&1)),
      :cdr => &tl(List.last(&1)),
      :cons => &([List.first(&1)] ++ List.last(&1)),
      :begin => &List.last(&1),
      :max => &max(List.first(&1) , List.last(&1)),
      :and => &(List.first(&1) and List.last(&1)),
      :not => &(not List.first(&1)),
      :list => &(&1)
    }

    case outer do
      nil -> env
      _  -> Map.put(%{}, :outer, outer)
    end
  end

  def put(key, value, env) do
    Map.put(env, key, value)
  end

  @doc """
    Recursively traverse nexted envs (representing local and global scope)
    for a key, until we reach global scope
  """
  def get(key, env) do
    case [Map.get(env, key), Map.get(env, :outer)] do
      [nil, nil] -> nil
      [nil, outer_env] -> get(key, outer_env)
      [val, _env] -> val
    end
  end
end
