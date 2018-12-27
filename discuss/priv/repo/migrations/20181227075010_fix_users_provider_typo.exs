defmodule Discuss.Repo.Migrations.AddUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      remove :email
      add :provider, :string
    end
  end
end
