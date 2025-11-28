"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TestTube, Lightbulb, Code, Cloud, FileCode } from "lucide-react";
import { useState, useEffect } from "react";

export default function TestingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link href="/environments/local" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Local Environment
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <TestTube className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-semibold">Testing</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Testing strategies, frameworks, and best practices for software and infrastructure code
        </p>
      </div>

      <Tabs defaultValue="thinking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="thinking">Thinking Approaches</TabsTrigger>
          <TabsTrigger value="pytest">Pytest (Python)</TabsTrigger>
          <TabsTrigger value="terraform">Terraform</TabsTrigger>
          <TabsTrigger value="cloudformation">CloudFormation</TabsTrigger>
        </TabsList>

        {/* Thinking Approaches Tab */}
        <TabsContent value="thinking" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Test-Driven Development (TDD)</CardTitle>
              </div>
              <CardDescription>Red-Green-Refactor cycle and TDD principles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">The TDD Cycle</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>Red:</strong> Write a failing test first. This defines what you want to build.</li>
                  <li><strong>Green:</strong> Write the minimum code to make the test pass.</li>
                  <li><strong>Refactor:</strong> Improve the code while keeping tests green.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Benefits of TDD</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Better design - forces you to think about interfaces first</li>
                  <li>Living documentation - tests describe how code works</li>
                  <li>Confidence to refactor - tests catch regressions</li>
                  <li>Faster debugging - tests pinpoint where issues occur</li>
                  <li>Prevents over-engineering - only build what you need</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TDD Example Workflow</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Step 1: Write a failing test
def test_calculate_total():
    assert calculate_total([10, 20, 30]) == 60

# Step 2: Run test (it fails - Red)
# Step 3: Write minimal code to pass
def calculate_total(items):
    return sum(items)

# Step 4: Run test (it passes - Green)
# Step 5: Refactor if needed
# Step 6: Repeat for next feature`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Mindset & Principles</CardTitle>
              <CardDescription>Core thinking patterns for effective testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Test Behavior, Not Implementation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Tests should verify what the code does, not how it does it. This makes tests resilient to refactoring.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-1">❌ Bad: Tests implementation details</p>
                  <pre className="text-xs">{`assert len(user_service._cache) == 1  # Internal detail`}</pre>
                  <p className="text-xs font-mono text-green-600 dark:text-green-400 mt-2">✅ Good: Tests behavior</p>
                  <pre className="text-xs">{`user = user_service.get_user(123)
assert user.id == 123  # Public behavior`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Arrange-Act-Assert (AAA) Pattern</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Structure tests clearly: set up data, perform action, verify result.
                </p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`def test_user_registration():
    # Arrange: Set up test data
    email = "test@example.com"
    password = "secure123"
    
    # Act: Perform the action
    user = register_user(email, password)
    
    # Assert: Verify the result
    assert user.email == email
    assert user.is_active is True`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Test Isolation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Each test should be independent and not rely on other tests. Use fixtures and mocks to isolate dependencies.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Tests should run in any order</li>
                  <li>One test failure shouldn&apos;t cascade to others</li>
                  <li>Clean up after each test (fixtures help)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Test Pyramid</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Balance your test suite: many unit tests, fewer integration tests, even fewer end-to-end tests.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-8 bg-green-500 rounded"></div>
                      <span>Unit Tests (70%) - Fast, isolated, test individual functions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-8 bg-yellow-500 rounded"></div>
                      <span>Integration Tests (20%) - Test component interactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                      <span>E2E Tests (10%) - Test full user workflows</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. F.I.R.S.T. Principles</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Fast:</strong> Tests should run quickly</li>
                  <li><strong>Independent:</strong> Tests shouldn&apos;t depend on each other</li>
                  <li><strong>Repeatable:</strong> Same results every time</li>
                  <li><strong>Self-validating:</strong> Pass or fail, no manual interpretation</li>
                  <li><strong>Timely:</strong> Write tests before or alongside code</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to Test</CardTitle>
              <CardDescription>Guidelines for deciding what deserves test coverage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">✅ Test These</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Business logic and core algorithms</li>
                  <li>Edge cases and boundary conditions</li>
                  <li>Error handling and failure paths</li>
                  <li>Data transformations and validations</li>
                  <li>Integration points between components</li>
                  <li>Critical user workflows</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">❌ Don&apos;t Test These</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Third-party library code (they test it)</li>
                  <li>Framework code (Django, Flask, etc.)</li>
                  <li>Simple getters/setters without logic</li>
                  <li>Code that&apos;s likely to change frequently (UI details)</li>
                  <li>Things that are hard to test and provide little value</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pytest Tab */}
        <TabsContent value="pytest" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>Pytest Basics</CardTitle>
              </div>
              <CardDescription>Getting started with pytest for Python testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install pytest
pip install pytest

# Install with common plugins
pip install pytest pytest-cov pytest-mock pytest-asyncio`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic Test Structure</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# test_calculator.py
def test_add():
    assert add(2, 3) == 5

def test_subtract():
    assert subtract(5, 2) == 3

# Run tests
# pytest test_calculator.py
# pytest -v  # verbose output
# pytest -k "add"  # run tests matching pattern`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Test Organization</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Project structure
project/
  src/
    calculator.py
  tests/
    test_calculator.py
    conftest.py  # Shared fixtures

# pytest.ini or pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fixtures</CardTitle>
              <CardDescription>Reusable test setup and teardown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Basic Fixtures</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`import pytest

@pytest.fixture
def sample_user():
    """Create a test user"""
    return User(email="test@example.com", name="Test User")

def test_user_email(sample_user):
    assert sample_user.email == "test@example.com"

# Fixture with setup/teardown
@pytest.fixture
def database():
    db = Database()
    db.connect()
    yield db  # Provide to test
    db.disconnect()  # Cleanup after test`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Fixture Scopes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-2">
                  <li><strong>function:</strong> Default, runs for each test</li>
                  <li><strong>class:</strong> Runs once per test class</li>
                  <li><strong>module:</strong> Runs once per test module</li>
                  <li><strong>session:</strong> Runs once per test session</li>
                </ul>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`@pytest.fixture(scope="module")
def expensive_setup():
    # This runs once for all tests in the module
    return setup_expensive_resource()

# conftest.py - shared fixtures across tests
@pytest.fixture(scope="session")
def api_client():
    return APIClient(base_url="http://localhost:8000")`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Parametrized Fixtures</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`@pytest.fixture(params=["sqlite", "postgres", "mysql"])
def database(request):
    return create_database(request.param)

def test_query(database):
    result = database.query("SELECT 1")
    assert result is not None`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mocking and Patching</CardTitle>
              <CardDescription>Isolating code under test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Using unittest.mock</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`from unittest.mock import Mock, patch, MagicMock

def test_api_call():
    # Create a mock object
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"data": "test"}
    
    # Patch external dependency
    with patch('requests.get', return_value=mock_response):
        result = fetch_data()
        assert result["data"] == "test"

# Using pytest-mock (cleaner syntax)
def test_api_call(mocker):
    mock_get = mocker.patch('requests.get')
    mock_get.return_value.json.return_value = {"data": "test"}
    
    result = fetch_data()
    assert result["data"] == "test"`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Common Mocking Patterns</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Mock external API calls
@patch('requests.post')
def test_send_notification(mock_post):
    mock_post.return_value.status_code = 200
    send_notification("test message")
    mock_post.assert_called_once()

# Mock file operations
@patch('builtins.open', mock_open(read_data="file content"))
def test_read_file():
    content = read_config()
    assert "file content" in content

# Mock datetime
@patch('datetime.datetime')
def test_timestamp(mock_datetime):
    mock_datetime.now.return_value = datetime(2024, 1, 1)
    assert get_timestamp() == "2024-01-01"`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parametrization</CardTitle>
              <CardDescription>Running the same test with different inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Basic Parametrization</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`@pytest.mark.parametrize("input,expected", [
    (2, 4),
    (3, 9),
    (4, 16),
])
def test_square(input, expected):
    assert square(input) == expected

# Multiple parameters
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (5, 5, 10),
    (-1, 1, 0),
])
def test_add(a, b, expected):
    assert add(a, b) == expected`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Parametrize with IDs</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`@pytest.mark.parametrize(
    "input,expected",
    [(2, 4), (3, 9), (4, 16)],
    ids=["two", "three", "four"]
)
def test_square(input, expected):
    assert square(input) == expected

# Output: test_square[two], test_square[three], test_square[four]`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Best Practices</CardTitle>
              <CardDescription>Writing maintainable and effective tests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Test Naming</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Good: Descriptive names
def test_user_registration_creates_active_user():
    ...

def test_calculate_total_handles_empty_list():
    ...

def test_api_returns_404_when_user_not_found():
    ...

# Bad: Vague names
def test_user():
    ...

def test_calc():
    ...`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">One Assertion Per Test (Usually)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Good: Focused test
def test_user_has_email():
    user = create_user("test@example.com")
    assert user.email == "test@example.com"

def test_user_is_active_by_default():
    user = create_user("test@example.com")
    assert user.is_active is True

# OK: Related assertions
def test_user_creation():
    user = create_user("test@example.com")
    assert user.email == "test@example.com"
    assert user.is_active is True
    assert user.created_at is not None`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Test Coverage</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Run with coverage
pytest --cov=src --cov-report=html

# Coverage configuration in pyproject.toml
[tool.pytest.ini_options]
[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*", "*/__pycache__/*"]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise AssertionError",
]`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terraform Testing Tab */}
        <TabsContent value="terraform" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <CardTitle>Terraform Testing Overview</CardTitle>
              </div>
              <CardDescription>Testing infrastructure as code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Why Test Terraform?</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Catch configuration errors before deployment</li>
                  <li>Validate resource dependencies and relationships</li>
                  <li>Ensure compliance and security policies</li>
                  <li>Document expected infrastructure behavior</li>
                  <li>Enable safe refactoring of infrastructure code</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Testing Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>terraform validate:</strong> Syntax and configuration validation</li>
                  <li><strong>terraform plan:</strong> Preview changes before apply</li>
                  <li><strong>terratest:</strong> Go-based testing framework</li>
                  <li><strong>terraform-compliance:</strong> BDD-style testing</li>
                  <li><strong>checkov:</strong> Static analysis for security and compliance</li>
                  <li><strong>tfsec:</strong> Security scanner for Terraform</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Validation</CardTitle>
              <CardDescription>Built-in Terraform validation commands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">terraform fmt</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Format Terraform files
terraform fmt

# Check formatting without modifying
terraform fmt -check

# Recursive formatting
terraform fmt -recursive`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">terraform validate</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Validate configuration syntax and references
terraform validate

# Example output for errors:
# Error: Reference to undeclared input variable
#   on main.tf line 5:
#    5:   instance_type = var.instance_type
# 
# An input variable with the name "instance_type" has not been declared.`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">terraform plan</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Preview changes (dry run)
terraform plan

# Save plan for later apply
terraform plan -out=tfplan

# Validate plan file
terraform show -json tfplan | jq .`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terratest</CardTitle>
              <CardDescription>Go-based testing framework for Terraform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install Go (if not already installed)
# Then install terratest
go get github.com/gruntwork-io/terratest/modules/terraform
go get github.com/stretchr/testify/assert`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic Test Structure</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestTerraformExample(t *testing.T) {
    // Configure Terraform options
    terraformOptions := &terraform.Options{
        TerraformDir: "../examples/terraform",
    }
    
    // Clean up resources after test
    defer terraform.Destroy(t, terraformOptions)
    
    // Initialize and apply
    terraform.InitAndApply(t, terraformOptions)
    
    // Get outputs
    instanceId := terraform.Output(t, terraformOptions, "instance_id")
    
    // Assertions
    assert.NotEmpty(t, instanceId)
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Testing Resource Properties</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/service/ec2"
    "github.com/gruntwork-io/terratest/modules/aws"
)

func TestEC2Instance(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../",
    }
    defer terraform.Destroy(t, terraformOptions)
    
    terraform.InitAndApply(t, terraformOptions)
    
    instanceId := terraform.Output(t, terraformOptions, "instance_id")
    region := terraform.Output(t, terraformOptions, "region")
    
    // Verify instance exists
    instance := aws.GetEc2Instance(t, region, instanceId)
    assert.Equal(t, "t3.micro", aws.StringValue(instance.InstanceType))
    assert.Equal(t, "running", aws.StringValue(instance.State.Name))
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>terraform-compliance</CardTitle>
              <CardDescription>BDD-style testing for Terraform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install via pip
pip install terraform-compliance

# Or via Docker
docker run --rm -v ${PWD}:/target -it \
    eerkunt/terraform-compliance`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Writing Compliance Tests</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# features/security.feature
Feature: Security compliance
  Scenario: Ensure all resources have tags
    Given I have resource that contains tags
    Then it must contain tags
    And its value must not be null

  Scenario: Ensure S3 buckets are not public
    Given I have aws_s3_bucket defined
    Then it must not have public_read
    And it must not have public_read_write

# Run tests
terraform-compliance -f features/ -p plan.out`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Example Test Scenarios</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# features/cost.feature
Feature: Cost optimization
  Scenario: EC2 instances should use appropriate instance types
    Given I have aws_instance defined
    Then its instance_type must be t3.micro
    Or its instance_type must be t3.small

# features/naming.feature
Feature: Naming conventions
  Scenario: Resources must follow naming convention
    Given I have resource that supports tags
    Then it must contain Name
    And its value must match the ".*-prod-.*" regex`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Static Analysis Tools</CardTitle>
              <CardDescription>Security and compliance scanning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Checkov</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install
pip install checkov

# Scan Terraform files
checkov -d .

# Scan specific directory
checkov -d terraform/

# Run specific checks
checkov -d . --check CKV_AWS_79

# Output in JSON
checkov -d . -o json`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">tfsec</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install
brew install tfsec  # macOS
# or
go install github.com/aquasecurity/tfsec/cmd/tfsec@latest

# Scan
tfsec .

# Exclude checks
tfsec --exclude AWS002,AWS003

# Output formats
tfsec --format json
tfsec --format junit`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CloudFormation Testing Tab */}
        <TabsContent value="cloudformation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileCode className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <CardTitle>CloudFormation Testing Overview</CardTitle>
              </div>
              <CardDescription>Testing AWS CloudFormation templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Why Test CloudFormation?</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Validate template syntax and structure</li>
                  <li>Ensure resources are created correctly</li>
                  <li>Verify IAM permissions and security settings</li>
                  <li>Test stack updates and rollbacks</li>
                  <li>Compliance with organizational policies</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Testing Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>aws cloudformation validate-template:</strong> Syntax validation</li>
                  <li><strong>cfn-lint:</strong> Linter for CloudFormation templates</li>
                  <li><strong>taskcat:</strong> Functional testing framework</li>
                  <li><strong>cfn-nag:</strong> Security and compliance scanner</li>
                  <li><strong>cfripper:</strong> Security analysis tool</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Validation</CardTitle>
              <CardDescription>AWS CLI validation commands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">validate-template</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Validate template syntax
aws cloudformation validate-template \
    --template-body file://template.yaml

# Validate from S3
aws cloudformation validate-template \
    --template-url https://s3.amazonaws.com/bucket/template.yaml

# Example output for errors:
# An error occurred (ValidationError) when calling the 
# ValidateTemplate operation: Template format error: 
# JSON not well-formed`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">get-template-summary</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Get template summary (parameters, resources, etc.)
aws cloudformation get-template-summary \
    --template-body file://template.yaml

# Output includes:
# - Parameters
# - Resource types
# - Capabilities required
# - Metadata`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>cfn-lint</CardTitle>
              <CardDescription>Linter for CloudFormation templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install via pip
pip install cfn-lint

# Or via Homebrew (macOS)
brew install cfn-lint`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic Usage</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Lint a template
cfn-lint template.yaml

# Lint all templates in directory
cfn-lint templates/*.yaml

# Output format
cfn-lint template.yaml --format json

# Include informational rules
cfn-lint template.yaml --include-checks I`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Common Checks</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>E1001: Invalid resource property</li>
                  <li>E3002: Invalid property value</li>
                  <li>E3012: Property value should be a list</li>
                  <li>W2001: Parameter not used</li>
                  <li>W2509: Missing required property</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>taskcat</CardTitle>
              <CardDescription>Functional testing framework for CloudFormation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install via pip
pip install taskcat

# Or via Homebrew
brew install taskcat`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Configuration</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# .taskcat.yml
project:
  name: my-cloudformation-project
  regions:
    - us-east-1
    - us-west-2
  template: template.yaml

tests:
  default:
    parameters:
      InstanceType: t3.micro
      KeyName: test-key
    regions:
      - us-east-1`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Running Tests</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Run all tests
taskcat test run

# Run specific test
taskcat test run -t default

# Clean up stacks after test
taskcat test run --cleanup

# Generate report
taskcat test run --report`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Test Structure</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# tests/test_template.py
import taskcat
import boto3

def test_stack_creates_successfully():
    """Test that stack creates without errors"""
    # taskcat handles stack creation
    # Add custom assertions here
    pass

def test_resources_exist():
    """Verify resources are created"""
    cf = boto3.client('cloudformation')
    stacks = cf.list_stacks()
    # Assertions on stack resources`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>cfn-nag</CardTitle>
              <CardDescription>Security and compliance scanner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install Ruby gem
gem install cfn-nag

# Or via Docker
docker run -v $(pwd):/scan \
    stelligent/cfn_nag_scan \
    template.yaml`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Scan template
cfn_nag_scan --input-path template.yaml

# Output format
cfn_nag_scan --input-path template.yaml --output-format json

# Fail on warnings
cfn_nag_scan --input-path template.yaml --fail-on-warnings

# Custom rule directory
cfn_nag_scan --input-path template.yaml --rule-directory custom-rules/`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Common Security Checks</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>IAM policies that are too permissive</li>
                  <li>S3 buckets without encryption</li>
                  <li>Security groups with overly open rules</li>
                  <li>Resources without required tags</li>
                  <li>Hardcoded credentials or secrets</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Best Practices</CardTitle>
              <CardDescription>Effective CloudFormation testing strategies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Validate Before Deploy</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Always validate templates before deployment
aws cloudformation validate-template \
    --template-body file://template.yaml

# Use cfn-lint for additional checks
cfn-lint template.yaml`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Test in Isolated Environments</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Use separate AWS accounts for testing</li>
                  <li>Clean up test stacks after validation</li>
                  <li>Use stack names with timestamps to avoid conflicts</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Test Stack Updates</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Test update scenarios
# 1. Create initial stack
aws cloudformation create-stack --stack-name test-stack ...

# 2. Update stack with changes
aws cloudformation update-stack --stack-name test-stack ...

# 3. Verify no unexpected changes
aws cloudformation describe-stack-events --stack-name test-stack`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Automate Testing in CI/CD</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Example GitHub Actions workflow
name: Test CloudFormation
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install cfn-lint
        run: pip install cfn-lint
      - name: Lint templates
        run: cfn-lint templates/*.yaml
      - name: Validate templates
        run: |
          for template in templates/*.yaml; do
            aws cloudformation validate-template \
              --template-body file://$template
          done`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

