class Baby < ApplicationRecord
  validates :name, presence: true
  validates_uniqueness_of :name, scope: :list_id, :case_sensitive => false
end
