require "test_helper"

class Api::V1::BabiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_babies_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_babies_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_babies_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_babies_destroy_url
    assert_response :success
  end
end
