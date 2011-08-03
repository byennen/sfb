class CreateFacebooks < ActiveRecord::Migration
  def change
    create_table :facebooks do |t|
      t.string :identifier, :limit => 20
      t.string :access_token

      t.timestamps
    end
  end
end
