source 'http://rubygems.org'

gem 'rails', '3.1.0'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'
gem 'fb_graph'
gem 'haml'
gem 'sass'
gem 'rake', '0.9.2'


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', "~> 3.1.0"
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

gem 'jquery-rails'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :development, :test do
  gem 'heroku'
  gem 'turn', :require => false
  gem 'cucumber'
  gem 'cucumber-rails'
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'database_cleaner'
  gem 'capybara'
  gem 'jasmine', :group => [:development, :test]
end

group :production do
  gem 'execjs'
  gem 'therubyracer'
  #gem 'pg'
end
