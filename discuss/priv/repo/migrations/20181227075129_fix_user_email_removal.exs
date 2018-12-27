defmodule Discuss.Repo.Migrations.AddUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      remove :providr
      add :email, :string
    end
  end
end
